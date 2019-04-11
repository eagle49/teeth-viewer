import React, {Component} from 'react';
import './App.css';

import Viewer from '../Viewer/Viewer';
let urls = [
  'https://firebasestorage.googleapis.com/v0/b/orthly-staging-36843.appspot.com/o/storybook-testing%2FARCHFORM_EXPORT_stage_0_of_10_lower.stl.gz?alt=media&token=68d8904e-7b5c-47f3-b346-52188c7de264',
  'https://firebasestorage.googleapis.com/v0/b/orthly-staging-36843.appspot.com/o/storybook-testing%2FARCHFORM_EXPORT_stage_0_of_10_upper.stl.gz?alt=media&token=a8ee81c4-70f3-4ccb-be92-76669c824919',
  'https://firebasestorage.googleapis.com/v0/b/orthly-staging-36843.appspot.com/o/storybook-testing%2FARCHFORM_EXPORT_stage_10_of_10_lower.stl.gz?alt=media&token=0bbd2bb2-753e-4cc6-9628-69c585106708',
  'https://firebasestorage.googleapis.com/v0/b/orthly-staging-36843.appspot.com/o/storybook-testing%2FARCHFORM_EXPORT_stage_10_of_10_upper.stl.gz?alt=media&token=05b6b386-4ab6-411b-972f-0e2de4ce1121',
  'https://firebasestorage.googleapis.com/v0/b/orthly-staging-36843.appspot.com/o/storybook-testing%2FARCHFORM_EXPORT_stage_2_of_10_lower.stl.gz?alt=media&token=4849c342-3244-43ba-ab6e-f549283e3e0a',
  'https://firebasestorage.googleapis.com/v0/b/orthly-staging-36843.appspot.com/o/storybook-testing%2FARCHFORM_EXPORT_stage_2_of_10_upper.stl.gz?alt=media&token=af27b203-d4f6-4bf1-aad3-e160ceba740f'
]
class App extends Component {
  render() {
    return (
        <div className="App">
          <Viewer url_arr={urls}/>
        </div>
    );
  }
}

export default App;
