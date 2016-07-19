import templates from './../../templates'

class CodeMirrorInstance {
    constructor (props) {
        this.props = props;


        this.init();
    }


    init () {
        if (typeof CodeMirror === 'undefined') throw 'CodeMirror plugin doesn\'t find';

        this.createHolder();
        this.initCodeMirror()
    }


    createHolder () {
        this.props.codemirror.holder.insertAdjacentHTML(
            'beforeend',
            templates.getTemplate('codeMirror')
        );

        this.holder = this.props.codemirror.holder.querySelector('.codemirror-holder')
    }


    initCodeMirror () {
        this.instance = CodeMirror(
            this.holder,
            this.props.codemirror.props
        )
    }

    /**
     * I set value in the coderMirror instance and refresh codeMirror;
     * @param element
     */
    setValue (element) {
        this.editedElement = element;
        this.instance.getDoc().setValue(element.textContent);

        setTimeout(() => this.instance.refresh(),100)
    }


    applyEditing () {
        this.editedElement.innerHTML = this.getValue();
        this.hide()
    }

    getValue () {
        return this.instance.getValue()
    }


    show () {
        this.holder.classList.remove('hidden');

        if (typeof this.props.codemirror.onShow === 'function') {
            this.props.codemirror.onShow()
        }
    }


    hide () {
        this.holder.classList.add('hidden');

        if (typeof this.props.codemirror.onShow === 'function') {
            this.props.codemirror.onHide()
        }
    }

}

export default CodeMirrorInstance