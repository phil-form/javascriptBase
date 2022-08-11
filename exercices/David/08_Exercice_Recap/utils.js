export function clear_root() {
    while (root.firstChild)
    root.removeChild(root.firstChild);
};

export function create_table(tableConfig) {
    const table = document.createElement('table');

    const thead = document.createElement('thead');
    const thead_tr = thead.insertRow();
    const tbody = document.createElement('tbody');
    const tfoot = document.createElement('tfoot');
    table.appendChild(thead);
    table.appendChild(tbody);   
    table.appendChild(tfoot);   

    for (let columnName in tableConfig.thead) {
        const th = document.createElement('th');
        th.scope = "col";
        th.className = "col-1";
        th.innerText = tableConfig.thead[columnName];
        thead_tr.appendChild(th);
    }

    for (let row in tableConfig.tbody) {
        const tr = tbody.insertRow();
        tr.className = "d-flex";
        let col_counter = 0;

        for (let item in tableConfig.tbody[row]) {
            let data;
            if (col_counter++ === 0) {
                data = document.createElement('th');
                tr.appendChild(data);
            } else
                data = tr.insertCell();

            data.scope = "row";
            data.className = "col-1";
            data.innerText = tableConfig.tbody[row][item];
        }
    }


    //style
    table.className = "table table-hover";
    thead.style = "border: none;"
    thead_tr.className = "d-flex";
    return table;
    // const test_config = {
    //     thead: ["id", "Name", "Price", ""],
    //     tbody: [
    //        [data1,  data2],
    //        [data1,  data2],
    //     ]
    // }
}