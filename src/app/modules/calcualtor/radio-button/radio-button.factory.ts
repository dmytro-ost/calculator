import { CHART } from "src/app/core/constants/localstorage";

export const getRadioButtonsTemplate = (
    name: string,
    id: string,
    label: string,
    isChecked: boolean = false): string => {

    return ` 
    <input type="radio" id="${id}" name="${name}" value="${id}" ${isChecked ? 'checked' : ''} 
    style="cursor: pointer; width: 9px; vertical-align: bottom; margin: 0;" 
    onclick="javascript:
        var stor = JSON.parse(localStorage.getItem('${CHART}') || '{}'); 
        stor['${name}'] = '${id}'; 
        localStorage.setItem('${CHART}', JSON.stringify(stor));
        window.dispatchEvent(new CustomEvent('storage_changed'))">

    <label for="${id}" style="cursor: pointer; font-size: 9px; letter-spacing: -0.5px; vertical-align: midle;">
        ${label}
    </label>
    `;
}
