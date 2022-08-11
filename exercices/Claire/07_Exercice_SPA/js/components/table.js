export class TableComponent
{
    constructor(tableConfig) {
        this.html = document.createElement('table');
        this.form = [];
        this.tableConfig = tableConfig;
        this.data = [];
        this.initTable(tableConfig);
    }

    initTable(tableConfig)
    {
        this.html.classList.add('table');
        this.html.classList.add('table-striped');
        this.html.classList.add('table-hover');
        this.thead = document.createElement('thead');
        this.tbody = document.createElement('tbody');

        let thead_tr = document.createElement('tr');

        for(const col of tableConfig.columns) {
            const th = document.createElement('th');
            th.scope = 'col';
            th.innerText = col.columnName;
            thead_tr.appendChild(th);
        }
        this.thead.appendChild(thead_tr);
        this.html.appendChild(this.thead);
        this.html.appendChild(this.tbody);   
        
        if(tableConfig.findDataCb)
        {
            this.refreshData();
        } else if(tableConfig.data)
        {
            this.data = tableConfig.data;
            this.processData();
        }
    }
    
    processData()
    {
        if(this.data.length > 0)
        {
            for(const row  of this.data)
            {
                let tr = document.createElement('tr');

                this.processRowData(row, this.tableConfig, tr);

                this.tbody.appendChild(tr);
            }

        }
    }

    processRowData(row, tableConfig, tr)
    {
        for(const col of tableConfig.columns)
        {
            if(col.value)
            {
                const value = this.processRow(row, col.value);
                const td = document.createElement('td');
                td.innerText = value;
                tr.appendChild(td);
            } else if(col.valueCb)
            {
                const value = col.valueCb(row);
                const td = document.createElement('td');
                td.innerText = value;
                tr.appendChild(td);
            } else if(col.type === 'FORM')
            {
                this.processForm(row, tableConfig, tr);
            } else if(col.type === 'ACTIONS')
            {
                this.processAction(row, tableConfig, tr);
            }
        }
    }

    processForm(row, tableConfig, tr)
    {
        if(!tableConfig.form)
        {
            return;
        }
        let td = document.createElement('td');
        const formId = tableConfig.form.formName + row[tableConfig.form.formIdValue];
        this.form[formId] = document.createElement('form');
        td.appendChild(this.form[formId]);

        for(const field of tableConfig.form.formFields)
        {
            // console.log(field);
            const input = document.createElement('input');
            input.name = field.fieldName;
            input.value = this.processRow(row, field.value);
            input.type = field.type;

            this.form[formId].appendChild(input);
        }
        tr.appendChild(td);
    }

    processAction(row, tableConfig, tr)
    {
        if(!tableConfig.actions)
        {
            return;
        }

        let actionsTd = document.createElement('td');
        let div = document.createElement('div');
        div.classList.add('btn-group');

        for(const action of tableConfig.actions)
        {
            // { actionName: '', actionHref: '', actionCb: (event), buttonType: number, hasForm: boolean}
            let actionBtn = document.createElement('button');
            actionBtn.innerText = action.actionName;

            actionBtn.addEventListener('click', (event) =>
            {
                event.preventDefault();

                let data = row;

                if(action.hasForm)
                {
                    const formId = tableConfig.form.formName + row[tableConfig.form.formIdValue];
                    data.form = new FormData(this.form[formId]);
                }

                action.actionCb(data);
            });

            const cssClass = this.getCssClass(action.buttonType)
            actionBtn.classList.add('btn', cssClass);
            div.appendChild(actionBtn);
            actionsTd.appendChild(div);
        }
        tr.appendChild(actionsTd);
    }

    /**
     * @param {any} row
     * @param {string} value
     */
    processRow(row, value)
    {
        // console.log(row, value)
        // itemtype.itemtypename
        if(value.indexOf('.') !== -1)
        {
            let objMemberName = value.split('.');
            const len = objMemberName.length;
            for(let i = 0; i < len; i++)
            {
                row = this.processRow(row, objMemberName[i]);
            }
            return row;
        }
        return row[value];
    }

    refreshData()
    {
        this.tableConfig.findDataCb().then((data) =>
            {
                while(this.tbody.firstChild)
                {
                    this.tbody.removeChild(this.tbody.firstChild);
                }
                this.data = JSON.parse(data);

                if(this.tableConfig.sortData)
                {
                    const sortData = this.tableConfig.sortData;
                    this.data.sort((a, b) =>
                    {
                        if(sortData.direction === 'ASC')
                        {
                            return a[sortData.sortColumnName] - b[sortData.sortColumnName];
                        }
                        return b[sortData.sortColumnName] - a[sortData.sortColumnName];
                    })
                }
                this.processData();
            })
    }

    getCssClass(btnType) {
        let cssClass = '';
        switch(btnType) {
            case 1:
                return 'btn-primary';
            case 2:
                return 'btn-secondary';
            case 3:
                return 'btn-success';
            case 4:
                return 'btn-info';
            case 5:
                return 'btn-danger';
            default:
                return 'btn-primary';
        }
    }
}
