class BoxShadonGenerator {
    constructor(
        horizontal,
        horizontalRef,
        vertical,
        verticalRef,
        blur,
        blurRef,
        spred,
        spredRef,
        color,
        colorRef,
        opacity,
        opacityRef,
        inset,
        previewBox,
        rule,
        webkitRule,
        mozRule
    ) {
        this.horizontal = horizontal;
        this.horizontalRef = horizontalRef;
        this.vertical = vertical;
        this.verticalRef = verticalRef;
        this.blur = blur;
        this.blurRef = blurRef;
        this.spred = spred;
        this.spredRef = spredRef;
        this.color = color;
        this.colorRef = colorRef;
        this.opacity = opacity;
        this.opacityRef = opacityRef;
        this.inset = inset;
        this.insetRef = inset.checked;
        this.previewBox = previewBox;
        this.rule = rule;
        this.webkitRule = webkitRule;
        this.mozRule = mozRule;
    }

    initialize() {
        this.horizontalRef.value = this.horizontal.value;
        this.verticalRef.value = this.vertical.value;
        this.blurRef.value = this.blur.value;
        this.spredRef.value = this.spred.value;
        this.colorRef.value = this.color.value;
        this.opacityRef.value = this.opacity.value;

        this.applyRule();
        this.showRule();
    }

    applyRule() {
        const rgbValue = this.hexToRgb(this.colorRef.value);

        console.log(this.insetRef);

        const shadonRule = `${this.insetRef ? "inset" : ""} ${
            this.horizontalRef.value
        }px ${this.verticalRef.value}px ${this.blurRef.value}px ${
            this.spredRef.value
        }px rgba(${rgbValue}, ${this.opacityRef.value})`;

        this.previewBox.style.boxShadow = shadonRule;
        this.currentRule = shadonRule;
    }

    showRule() {
        // Exibe as regras CSS em diferentes formatos
        this.rule.innerText = this.currentRule;
        this.webkitRule.innerText = `-webkit-box-shadow: ${this.currentRule}`;
        this.mozRule.innerText = `-moz-box-shadow: ${this.currentRule}`;
    }

    updateValue(type, value) {
        switch (type) {
            case "horizontal":
                this.horizontalRef.value = value;
                this.applyRule(); // Atualiza a sombra após mudar o valor
                this.showRule(); // Atualiza a visualização da regra
                break;

            case "vertical":
                this.verticalRef.value = value;
                this.applyRule(); // Atualiza a sombra após mudar o valor
                this.showRule(); // Atualiza a visualização da regra
                break;

            case "blur":
                this.blurRef.value = value;
                this.applyRule(); // Atualiza a sombra após mudar o valor
                this.showRule(); // Atualiza a visualização da regra
                break;

            case "spred":
                this.spredRef.value = value;
                this.applyRule();
                this.showRule();
                break;

            case "color":
                this.colorRef.value = value;
                this.applyRule();
                this.showRule();
                break;
            case "opacity":
                this.opacityRef.value = value;
                this.applyRule();
                this.showRule();
                break;
            case "inset":
                this.insetRef = value;
                this.applyRule();
                this.showRule();
                break;
        }
    }

    hexToRgb(hex) {
        return `${("0x" + hex[1] + hex[2]) | 0}, ${
            ("0x" + hex[3] + hex[4]) | 0
        }, ${("0x" + hex[5] + hex[6]) | 0}`;
    }
}

// Seleção de elementos
const horizontal = document.querySelector("#horizontal");
const horizontalRef = document.querySelector("#horizontal-value");
const vertical = document.querySelector("#vertical");
const verticalRef = document.querySelector("#vertical-value");
const blur = document.querySelector("#blur");
const blurRef = document.querySelector("#blur-value");
const spred = document.querySelector("#spred");
const spredRef = document.querySelector("#spred-value");

const color = document.querySelector("#color");
const colorRef = document.querySelector("#color-value");
const opacity = document.querySelector("#opacity");
const opacityRef = document.querySelector("#opacity-value");
const inset = document.querySelector("#inset");

const previewBox = document.querySelector("#box");

const rule = document.querySelector("#rule span");
const webkitRule = document.querySelector("#webkit-rule span");
const mozRule = document.querySelector("#moz-rule span");

const BoxShadon = new BoxShadonGenerator(
    horizontal,
    horizontalRef,
    vertical,
    verticalRef,
    blur,
    blurRef,
    spred,
    spredRef,
    color,
    colorRef,
    opacity,
    opacityRef,
    inset,
    previewBox,
    rule,
    webkitRule,
    mozRule
);

console.log(BoxShadon);

BoxShadon.initialize();

// Eventos
horizontal.addEventListener("input", (e) => {
    const value = e.target.value;
    BoxShadon.updateValue("horizontal", value); // Corrigido de boxShadow para BoxShadon
});

vertical.addEventListener("input", (e) => {
    const value = e.target.value;
    BoxShadon.updateValue("vertical", value); // Corrigido de boxShadow para BoxShadon
});

spred.addEventListener("input", (e) => {
    const value = e.target.value;
    BoxShadon.updateValue("spred", value); // Corrigido de boxShadow para BoxShadon
});

blur.addEventListener("input", (e) => {
    const value = e.target.value;
    BoxShadon.updateValue("blur", value); // Corrigido de boxShadow para BoxShadon
});

color.addEventListener("input", (e) => {
    const value = e.target.value;
    BoxShadon.updateValue("color", value);
});

opacity.addEventListener("input", (e) => {
    const value = e.target.value;
    BoxShadon.updateValue("opacity", value);
});

inset.addEventListener("input", (e) => {
    const value = e.target.checked;
    BoxShadon.updateValue("inset", value);
});

// Copiar regra

const rulesArea = document.querySelector("#rules-area");
const copyIntructions = document.querySelector("#copy-intructions");

rulesArea.addEventListener("click", () => {
    const rules = rulesArea.innerText.replace(/^\s*\n/gm, "");

    navigator.clipboard.writeText(rules).then(() => {
        copyIntructions.innerText = "Regra copiada com sucesso!";

        setTimeout(() => {
            copyIntructions.innerText =
                "Clique no quadro acima para copiar as regras";
        }, 1000);
    });
});
