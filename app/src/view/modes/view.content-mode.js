import EditableElement from '../components/editable-element.js'

import helper from './../../../mixins/helpers.js'

class EditorMode  {

    /**
     *
     * @param element
     */
    onContentElementHover (element) {

        if (this.isElementLegal(element)) {
            element.classList.add('on-hover')
        }

    }

    /**
     *
     * @param element
     */
    onContentElementClick (element) {
        if ( !this.isElementLegal(element) ) return;

        if (!this.editableInstance) {
            this.editableInstance = new EditableElement();
        }

        this.editableInstance.setContent(element);
        this.editableInstance.modal.show();


    }

    editableElementAccept (data) {
        this.dispatcher.mediator.pub('content:edited')
    }

    /**
     * Validate [hoverable,clickable] element
     * @param element
     * @returns {boolean}
     */
    isElementLegal (element) {
        const bannedTags = ['IMG', 'VIDEO'];
        const bannedMatches = ['[switchable]', '[drop-container]'];

        let isBanned = bannedMatches.some(match => helper.matches.call(element, match));
        let childrens = element.querySelectorAll('*').length;
        let isEmptyContent = element.textContent.trim() === '';

        return (
            bannedTags.indexOf(element.tagName) === -1
            && !isBanned
            && childrens <= 3
            && !isEmptyContent
        )
    }


}

export default EditorMode