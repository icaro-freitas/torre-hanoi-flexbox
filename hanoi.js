const clearNode = (DOMNode) => {
    while (DOMNode.firstChild) {
        DOMNode.removeChild(DOMNode.lastChild);
    }
}

const clearStacks = () => {
    const stacks = document.getElementsByClassName("stack")
    for (stack of stacks) {
        clearNode(stack)
    }
}

const moveDisks = (event) => {
    const towerName = event.target.parentElement.id
    const actualTowerNumber = towerName.substring(towerName.length - 1)

    const nextTowerNumber = event.target.getAttribute("next")

    const actualStack = document.getElementById(`stack-${actualTowerNumber}`)
    const nextStack = document.getElementById(`stack-${nextTowerNumber}`)
    const scoreParagraph = document.getElementById("score")
    if (actualStack.hasChildNodes()) {
        if (!nextStack.hasChildNodes() || actualStack.firstChild.offsetWidth < nextStack.firstChild.offsetWidth) {
            nextStack.insertBefore(actualStack.firstChild, nextStack.firstChild)
            const scoreBefore = scoreParagraph.getAttribute("score")
            scoreParagraph.setAttribute("score", `${Number(scoreBefore) + 1}`)
            scoreParagraph.innerHTML = `Número de Jogadas: ${scoreParagraph.getAttribute("score")}`
        }
    }

    const disksQuantity = scoreParagraph.getAttribute("disksQuantity")
    if (nextStack.childElementCount >= disksQuantity && disksQuantity != 0) {
        setTimeout(() => {
            alert("Parabéns, você ganhou");
        }, "100");
    }
}

const buttonMoveList = document.getElementsByClassName("button-move-disk")
for (let button of buttonMoveList) {
    button.addEventListener("click", moveDisks)
}

const createDisks = (event) => {
    const disksQuantity = document.getElementById("disks-quantity").value
    if (!isNaN(disksQuantity) && !isNaN(parseFloat(disksQuantity))) {
        clearStacks()

        const scoreParagraph = document.getElementById("score")
        scoreParagraph.setAttribute("score", 0)
        scoreParagraph.innerHTML = `Número de Jogadas: ${scoreParagraph.getAttribute("score")}`
        scoreParagraph.setAttribute('disksQuantity', disksQuantity)

        const disksHeight = 100 / disksQuantity

        const stack1 = document.getElementById("stack-1")

        for (let i = 0; i < disksQuantity; i++) {
            const disk = document.createElement("div")
            disk.style.height = `${disksHeight}%`
            const diskWidth = (100 / disksQuantity) * (i + 1)
            disk.style.width = `${diskWidth}%`
            disk.style.backgroundColor = "#00f"
            disk.setAttribute("class", "disks")
            stack1.append(disk)
        }
    }
}

const buttonCreate = document.getElementById("button-create-disks").addEventListener("click", createDisks)