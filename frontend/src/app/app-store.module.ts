import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { tracksReducer } from './store/track.reducer';
import { albumsReducer } from './store/album.reducer';
import { usersReducer } from './store/user.reducer';
import { artistsReducer } from './store/artist.reducer';
import { ArtistsEffects } from './store/artist.effects';
import { UsersEffects } from './store/user.effects';
import { AlbumsEffects } from './store/album.effects';
import { TracksEffects } from './store/track.effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { tracksHistoryReducer } from './store/trackHistory.reducer';
import { TrackHistoryEffects } from './store/trackHistory.effects';

const localStorageSyncReducer = (reducer: ActionReducer<any>) => {
  return localStorageSync({
    keys: [{users: ['user']}],
    rehydrate: true
  })(reducer);
}

const metaReducers: MetaReducer[] = [localStorageSyncReducer];

const reducers = {
  artists: artistsReducer,
  users: usersReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  tracksHistory: tracksHistoryReducer
};

const effects = [ArtistsEffects, UsersEffects, AlbumsEffects, TracksEffects, TrackHistoryEffects];

@NgModule({
  imports: [
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot(effects),
  ],
  exports: [StoreModule, EffectsModule]
})
export class AppStoreModule {}
