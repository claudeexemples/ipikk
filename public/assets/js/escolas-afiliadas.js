        document.addEventListener("DOMContentLoaded", function() {
            const items = document.querySelectorAll(".escola_afiliada-item");

            items.forEach(item => {
                const header = item.querySelector(".escola_afiliada-cabecalho");
                const content = item.querySelector(".escola_afiliada-conteudo");

                header.addEventListener("click", () => {
                    const isOpen = item.classList.contains("active");

                    items.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains("active")) {
                            otherItem.classList.remove("active");
                            const otherContent = otherItem.querySelector(".escola_afiliada-conteudo");
                            otherContent.style.maxHeight = null;
                        }
                    });

                    if (isOpen) {
                        item.classList.remove("active");
                        content.style.maxHeight = null; 
                    } else {
                        item.classList.add("active");
                        content.style.maxHeight = content.scrollHeight + 50 + "px";
                    }
                });
            });
        });