import { TestBed } from '@angular/core/testing';

import { GestionCours } from './gestion-cours';

describe('GestionCours', () => {
  let service: GestionCours;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionCours);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
