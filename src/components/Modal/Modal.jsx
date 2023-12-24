import { Component } from "react";
import { Overlay, ModalDiv } from "components";

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.escapeCloseModal);
      }
      componentWillUnmount() {
        window.removeEventListener('keydown', this.escapeCloseModal);
      }
    
      escapeCloseModal = evt => {
        if (evt.code === 'Escape') {
          this.props.onCloseModal();
        }
      };
      backdropCloseModal = evt => {
        if (evt.target === evt.currentTarget) {
          this.props.onCloseModal();
        }
      };

    render() { 
        return (<Overlay onClick={this.backdropCloseModal}>
            <ModalDiv>
              <img src={this.props.src.large} alt={this.props.alt} />
            </ModalDiv>
          </Overlay>);
    }
}
