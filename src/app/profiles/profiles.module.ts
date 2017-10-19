import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import {
    HelgolandDepictionModule,
    HelgolandMapSelectorModule,
    HelgolandPermalinkModule,
    HelgolandSelectorModule,
    HelgolandTimeModule,
    HelgolandToolboxModule,
} from 'helgoland-toolbox';

import { ToolboxModule } from './../toolbox/toolbox.module';
import { ProfilesCombiViewPermalink } from './combi-view/combi-view-permalink.service';
import { ProfilesCombiViewComponent } from './combi-view/combi-view.component';
import { ProfilesCombiService } from './combi-view/combi-view.service';
import { ProfilesDiagramPermalink } from './diagram/diagram-permalink.service';
import { ProfilesDiagramComponent } from './diagram/diagram.component';
import { ProfilesNavigationComponent } from './navigation/navigation.component';
import { ProfilesSelectionPermalink } from './selection/selection-permalink.service';
import { ProfilesSelectionComponent } from './selection/selection.component';
import { ProfilesSelectionCache } from './selection/selection.service';
import { ProfilesService } from './services/profiles.service';

const profilesRoutes: Routes = [
  {
    path: 'profiles',
    component: ProfilesNavigationComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'diagram'
      },
      {
        path: 'diagram',
        component: ProfilesDiagramComponent
      },
      {
        path: 'selection',
        component: ProfilesSelectionComponent
      },
      {
        path: 'combi',
        component: ProfilesCombiViewComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ToolboxModule,
    HelgolandToolboxModule,
    HelgolandPermalinkModule,
    HelgolandSelectorModule,
    HelgolandDepictionModule,
    HelgolandMapSelectorModule,
    HelgolandTimeModule,
    RouterModule.forRoot(
      profilesRoutes
    ),
    NgbTabsetModule
  ],
  declarations: [
    ProfilesDiagramComponent,
    ProfilesSelectionComponent,
    ProfilesCombiViewComponent,
    ProfilesNavigationComponent
  ],
  providers: [
    ProfilesDiagramPermalink,
    ProfilesSelectionCache,
    ProfilesSelectionPermalink,
    ProfilesService,
    ProfilesCombiService,
    ProfilesCombiViewPermalink
  ]
})
export class ProfilesModule { }
