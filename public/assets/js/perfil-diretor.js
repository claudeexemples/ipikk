function openTab(evt, tabName) {
    var i, tabContent, tabBtn;
        
    // Esconder todo conteúdo
    tabContent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
        tabContent[i].classList.remove("active-content");
    }
        
    // Remover classe ativa dos botões
    tabBtn = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tabBtn.length; i++) {
        tabBtn[i].className = tabBtn[i].className.replace(" active", "");
    }
        
    // Mostrar o atual
    document.getElementById(tabName).style.display = "block";
        
    // Pequeno delay para animação de opacidade funcionar
    setTimeout(() => {
        document.getElementById(tabName).classList.add("active-content");
    }, 10);
       
    evt.currentTarget.className += " active";
}