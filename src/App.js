import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header/Header';
import PlannedExpenses from './components/Planned_Expenses/PlannedExpenses';
import Target from './components/Target/Target';

let screen ="";
if(window.location.pathname === "/expenses") {
  screen = "expenses";
} 
else if (window.location.pathname === "/" || window.location.pathname === "/mywalletwise") {
  screen = "expenses";
}
else if (window.location.pathname === "/target") {
  screen = "target";
}

function App() {
  if(screen === "expenses") {
  return ( 
    <>
      <Header />
      <PlannedExpenses />
    </>
  );
  } 
  else if (screen === "target") {
    return (
      <>
        <Header />
        <Target />
      </>
    );
  }
  else{
    return ( 
      <>
        <Header />
        <PlannedExpenses />
      </>
    );
  }
}

export default App;
