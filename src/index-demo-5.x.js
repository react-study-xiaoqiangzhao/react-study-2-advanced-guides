/* eslint-disable react-in-jsx-scope */
import React  from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

// Demo 5.1
// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.onchangeHandler = this.onchangeHandler.bind(this);
//     this.state = {
//       labelText: 'labelText',
//       inputValue: 'inputValue'
//     };
//   }

//   onchangeHandler(e) {
//     this.setState({
//       inputValue: e.target.value
//     });
//   }

//   render() {
//     return (<input
//       type="text"
//       aria-label={this.state.labelText}
//       aria-required="true"
//       onChange={this.onchangeHandler}
//       value={this.state.inputValue}
//       name="name"
//     />);
//   }
// }
// ReactDOM.render(
//   <App/>, 
//   document.getElementById('root')
// );

// Demo 5.2
// class App extends React.Component {

//   render() {
//     return (
//       <div>
//         <label htmlFor="namedInput">Name:</label>
//         <input id="namedInput" type="text" name="name"/>
//       </div>
//     );
//   }
// }
// ReactDOM.render(
//   <App/>, 
//   document.getElementById('root')
// );

// Demo 5.3
// function CustomTextInput(props) {
//   return (
//     <div>
//       <input ref={props.inputRef} />
//     </div>
//   );
// }

// class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.inputElement = React.createRef();

//     setTimeout(() => {
//       this.inputElement.current.focus();
//     }, 2000);
//   }
//   render() {
//     return (
//       <CustomTextInput inputRef={this.inputElement} />
//     );
//   }
// }
// ReactDOM.render(
//   <App/>, 
//   document.getElementById('root')
// );

// Demo 5.4
// class OuterClickExample extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = { isOpen: false };
//     this.toggleContainer = React.createRef();

//     this.onClickHandler = this.onClickHandler.bind(this);
//     this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
//   }

//   componentDidMount() {
//     window.addEventListener('click', this.onClickOutsideHandler);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('click', this.onClickOutsideHandler);
//   }

//   onClickHandler() {
//     this.setState(currentState => ({
//       isOpen: !currentState.isOpen
//     }));
//   }

//   onClickOutsideHandler(event) {
//     if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)) {
//       this.setState({ isOpen: false });
//     }
//   }

//   render() {
//     return (
//       <div ref={this.toggleContainer}>
//         <button onClick={this.onClickHandler}>Select an option</button>
//         {this.state.isOpen ? (
//           <ul>
//             <li>Option 1</li>
//             <li>Option 2</li>
//             <li>Option 3</li>
//           </ul>
//         ) : null}
//       </div>
//     );
//   }
// }
// ReactDOM.render(
//   <OuterClickExample/>, 
//   document.getElementById('root')
// );

// Demo 5.5
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
// import Loadable from 'react-loadable';

// const App = () => (
//   <Router>
//     <div>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//       </ul>

//       <hr />

//       <Route exact path="/" component={Home} />
//       <Route path="/about" component={About} />
//     </div>
//   </Router>
// );

// const Loading = () => <div>Loading...</div>;
// const Home = Loadable({
//   loader: () => import('./routes/Home.js'),
//   loading: Loading,
// });

// const About = () => (
//   <div>
//     <h2>About</h2>
//   </div>
// );

// ReactDOM.render(
//   <App/>, 
//   document.getElementById('root')
// );

// Demo 5.6
// const ThemeContext = React.createContext('light');
// function Toolbar() {
//   return (
//     <div>
//       <ThemedButton/>
//     </div>
//   );
// }
// function ThemedButton(props) {
//   return (
//     <ThemeContext.Consumer>
//       {theme =>
//         <div className={theme}>{theme}</div>
//       }
//     </ThemeContext.Consumer>
//   );
// }
// class App extends React.Component {
//   render() {
//     return (
//       <ThemeContext.Provider value="dark">
//         <Toolbar/>
//       </ThemeContext.Provider>
//     );
//   }
// }
// ReactDOM.render(
//   <App/>, 
//   document.getElementById('root')
// );

// Demo 5.7
export const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
};
export const ThemeContext = React.createContext(
  themes.dark // default value
);
function ThemedButton(props) {
  return (
    <ThemeContext.Consumer>
      {theme => (
        <button
          {...props}
          style={{backgroundColor: theme.background, color: theme.foreground}}
        />
      )}
    </ThemeContext.Consumer>
  );
}
function Toolbar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    return (
      <div>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
        </ThemeContext.Provider>
        <section>
          <ThemedButton>
            没有被 ThemeContext.Provider 包裹的地方是“不可以”联动的
          </ThemedButton>
          <ThemeContext.Provider value={this.state.theme}>
            <ThemedButton>
              被 ThemeContext.Provider 包裹的地方是“可以”联动的
            </ThemedButton>
          </ThemeContext.Provider>
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
