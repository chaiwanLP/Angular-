import { Routes } from '@angular/router';
import { AsyncDemoComponent } from './pages/async-demo/async-demo';
import { CallApiComponent } from './pages/call-api/call-api';
import { PostputComponent } from './pages/postput/postput';
import { UploadComponent } from './pages/upload/upload';
import { UpdateTripComponent } from './pages/updatetrip/updatetrip';
    
export const routes: Routes = [
    {path: '', component: AsyncDemoComponent },
    {path: 'callapi', component: CallApiComponent },
    {path: 'postput', component: PostputComponent },
    {path: 'upload', component: UploadComponent },
    {path: 'updateTrip', component: UpdateTripComponent },

];
