// package import
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

// styles import
import 'react-toastify/dist/ReactToastify.css';

// component import
import { Searchbar } from './components';
import { ImageGallery } from './components';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  // TODO function to update state on form submit
  const formSubmitHandler = newQuery => {
    setSearchQuery(newQuery);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={formSubmitHandler} />
      <ImageGallery searchQuery={searchQuery} />
      <ToastContainer autoClose={2000} position="top-right" />
    </div>
  );
}

export default App;
