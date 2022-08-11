class NavBarComponent {
    constructor(logo, links) {
        this.logo = logo;
        this.links = links;
    };

    toHTML(container) {
        const nav = document.createElement('nav');
        nav.classList.add('navbar', 'navbar-expand-sm');

        const div = document.createElement('div');
        div.classList.add('container-fluid');

        const logoLink = document.createElement('a');
        logoLink.classList.add('navbar-brand');
        logoLink.href= '#';
        logoLink.id = 'nav-logo-id';
        const logoImg = document.createElement('img');
        logoImg.src = this.logo;
        logoImg.alt = 'Logo';
        logoImg.style= 'width:70px;'

        logoLink.appendChild(logoImg);
        div.appendChild(logoLink);

        const routesDiv = document.createElement('div');
        routesDiv.classList.add('collapse', 'navbar-collapse');
        routesDiv.id = 'mynavbar';
        const routesUl = document.createElement('ul');
        routesUl.classList.add('navbar-nav', 'me-auto');

        this.links.forEach(link => {
            const linkLi = document.createElement('li');
            linkLi.classList.add('nav-item');
            const linkA = document.createElement('a');
            linkA.classList.add('nav-link', 'text-dark');
            linkA.href = '#';
            linkA.id = 'nav-link-' + link.toLowerCase();
            linkA.innerHTML = link;

            linkLi.appendChild(linkA);
            routesUl.appendChild(linkLi);
        });

        routesDiv.appendChild(routesUl);
        div.appendChild(routesDiv);
        nav.appendChild(div);

        container.appendChild(nav);
    };
}

export default NavBarComponent;