import { Routes, RouterModule } from '@angular/router';
import { AsyncDemoComponent } from './pages/async-demo/async-demo';
import { CallApiComponent } from './pages/call-api/call-api';
import { PostputComponent } from './pages/postput/postput';
import { UploadComponent } from './pages/upload/upload';
import { UpdateTripComponent } from './pages/updatetrip/updatetrip';
import { Detail } from './pages/detail/detail';

    
export const routes: Routes = [
    {path: '', component: CallApiComponent },
    {path: 'Detail/:idx', component: Detail },
    {path: 'postput', component: PostputComponent },
    {path: 'upload', component: UploadComponent },
    {path: 'updateTrip', component: UpdateTripComponent },

];
