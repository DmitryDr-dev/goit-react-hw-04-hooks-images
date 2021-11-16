import Loader from 'react-loader-spinner';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './Loader.css';

export function LoaderComponent() {
  return (
    <div className="loaderWrap">
      <Loader type="Bars" color="#00BFFF" height={175} width={175} />
    </div>
  );
}
