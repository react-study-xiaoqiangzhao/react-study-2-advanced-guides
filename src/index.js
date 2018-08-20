/* eslint-disable react-in-jsx-scope */
import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Demo 6.1
// const FancyButton = React.forwardRef((props, ref) => (
//   <button ref={ref} className="FancyButton">
//     {props.children}
//   </button>
// ));

// // You can now get a ref directly to the DOM button:
// const ref = React.createRef();
// ReactDOM.render(<FancyButton ref={ref}>Click me!</FancyButton>, document.getElementById('root'));
// console.log(document.getElementsByTagName('button')[0] === ref.current);
// true

// Demo 6.2
// class Columns extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <td>Hello</td>
//         <td>World</td>
//       </React.Fragment>
//     );
//   }
// }

// class Table extends React.Component {
//   render() {
//     return (
//       <table>
//         <tbody>
//           <tr>
//             <Columns />
//           </tr>
//         </tbody>
//       </table>
//     );
//   }
// }
// ReactDOM.render(<Table/>, document.getElementById('root'));

// Demo 6.3
// class SomePlugin extends React.Component {
//   componentDidMount() {
//     // 这里可以用 jQuery, 然后再做点什么
//     // this.$el = $(this.el);

//     // 也可以用原生的 js 来操作Dom
//     const H1 = document.createElement('h1');
//     H1.innerText = '原生 JS 生成的标签';
//     console.log(this.el);
//     this.el.appendChild(H1);
//   }

//   render() {
//     return <div ref={el => this.el = el}/>;
//   }
// }
// ReactDOM.render(<SomePlugin/>, document.getElementById('root'));

// Demo 6.4
const appRoot = document.getElementById('root');
const modalRoot = document.getElementById('modal-root');

// Let's create a Modal component that is an abstraction around
// the portal API.
class Modal extends React.Component {
  constructor(props) {
    super(props);
    // Create a div that we'll render the modal into. Because each
    // Modal component has its own element, we can render multiple
    // modal components into the modal container.
    this.el = document.createElement('div');
  }

  componentDidMount() {
    // Append the element into the DOM on mount. We'll render
    // into the modal container element (see the HTML tab).
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    // Remove the element from the DOM when we unmount
    modalRoot.removeChild(this.el);
  }
  
  render() {
    // Use a portal to render the children into the element
    return ReactDOM.createPortal(
      // Any valid React child: JSX, strings, arrays, etc.
      this.props.children,
      // A DOM element
      this.el,
    );
  }
}


// The Modal component is a normal React component, so we can
// render it wherever we like without needing to know that it's
// implemented with portals.
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false};
    
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({showModal: true});
  }
  
  handleHide() {
    this.setState({showModal: false});
  }

  render() {
    // Show a Modal on click.
    // (In a real app, don't forget to use ARIA attributes
    // for accessibility!)
    const modal = this.state.showModal ? (
      <Modal>
        <div className="modal">
          <div>
            With a portal, we can render content into a different
            part of the DOM, as if it were any other React child.
          </div>
          This is being rendered inside the #modal-container div.
          <button onClick={this.handleHide}>Hide modal</button>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app">
        This div has overflow: hidden.
        <button onClick={this.handleShow}>Show modal</button>
        {modal}
      </div>
    );
  }
}

ReactDOM.render(<App />, appRoot);

registerServiceWorker();
