let facilitiesDropdownMenu = document.querySelectorAll('.facilities-dropdown__menu-js')
let facilitiesDropdownBtn = document.querySelectorAll('.facilities-dropdown__btn')

for (let i = 0; i < facilitiesDropdownMenu.length; i++) {
    facilitiesDropdownBtn[i].onclick = function() {
        facilitiesDropdownMenu[i].classList.toggle('facilities-dropdown__open-js');
    };
}

