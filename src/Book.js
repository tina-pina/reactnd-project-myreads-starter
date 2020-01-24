import React, { Component } from 'react';
import Modal from './Modal';

class Book extends Component {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            selectedShelf: "",
        }
    }

    handleChangeShelf = newShelf => {
        const { book } = this.props
        newShelf = newShelf.target.value
        this.props.handleChangeShelf(book, newShelf)
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    componentWillMount() {
        const { book, allBooks } = this.props

        // from main
        if(!allBooks) {
            this.setState({selectedShelf: book.shelf})
            return
        }

        // from search
        let selectedBook = allBooks.filter(b => b.id === book.id)[0]
        if(selectedBook) {
            this.setState({selectedShelf: selectedBook.shelf})
        } else {
            this.setState({selectedShelf: "none"})
        }
    }


    render() {
        const { book } = this.props

        return (
            <div className='shelf'>
                <li className="book">
                    <div className="book-top">
                    { book.imageLinks?
                        (<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}></div>): <div>no image available</div>
                    }
                    <form className="book-shelf-changer">
                        <select className="book-shelf-changer--select" defaultValue={this.state.selectedShelf} onChange={(ev) => {
                            this.handleChangeShelf(ev)}}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </form>
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-authors">{ book.authors }</div>
                    <Modal show={this.state.show} handleClose={this.hideModal}>
                        <p>{book.description}</p>
                    </Modal>
                    <button className="modal-button" type="button" onClick={this.showModal}>more</button>
                    <p>{this.state.selected}</p>
                </li>
            </div>
        )
    }
}

export default Book;