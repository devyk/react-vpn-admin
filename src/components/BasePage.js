import React from 'react';

export default class BasePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            page: 1,
            pageCount: 0,
            entity: {},
            list: [],
        };
    }

    onModalHide = () => {
        this.setState({showModal: false});
    };

    onModalOpen = (object) => {
        this.setState({
            showModal: true,
            entity: object
        });
    };

    componentWillMount = () => {
        this.triggerChange();
    };


    onDelete = (data) => {
        return this.deleteEntity(data).then(() => {
            this.triggerChange();
        });
    };

    onSave = (data) => {
        if (data.id) {
            return this.updateEntity(data).then(() => {
                this.triggerChange();
            });
        }
        return this.createEntity(data).then(() => {
            this.triggerChange();
        });
    };

    triggerChange = () => {
        this.loadPage(this.state.page);
        if (this.props.onChange) {
            this.props.onChange();
        }
    };

    loadPage = (next) => {
        return this.loadEntityList(next).then((response) => {
            this.setState({
                pageCount: response.pages,
                list: response.data,
                page: next
            });
        });
    };
}
