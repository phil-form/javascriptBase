function my_callback() {
    console.log('callback');
}

export class NavBar {
    items = [];

    constructor(navBar_config) {
        this.read_config(navBar_config);
        return this.build();
    }

    read_config(navBar_config) {
        for (const item in navBar_config)
            this.items.push(navBar_config[item]);
    };

    build() {
        const root = document.createElement('form');

        for (const item of this.items) {
            const button = document.createElement('button');
            button.className = "btn btn-link";
            button.innerText = item.title;

            button.addEventListener('click', (e) => {
                e.preventDefault();
                item.callback();
            });
            root.appendChild(button);
        }

        return root;
    }

    test_config = [
        {
            title: "Register",
            callback: my_callback
        },
        {
            title: "Home",
            callback: my_callback
        },
        {
            title: "Shop",
            callback: my_callback
        },
        {
            title: "Basket",
            callback: my_callback
        },
    ];
};