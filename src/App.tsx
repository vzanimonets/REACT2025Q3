import './App.css';
import Search from './components/Search';
import CardList from './components/CardList';
import ErrorBoundary from './components/ErrorBoundary';
import ErrorButton from './components/ErrorButton';

function App() {
  return (
    <ErrorBoundary>
      <div className="app-container">
        <header className="app-header">
          <Search />
        </header>
        <main className="app-main">
          <CardList />
        </main>
        <div className="error-btn-container">
          <ErrorButton />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
