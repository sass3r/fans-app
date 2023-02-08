import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiListaPersonajesComponent } from './mi-lista-personajes.component';

describe('MiListaPersonajesComponent', () => {
  let component: MiListaPersonajesComponent;
  let fixture: ComponentFixture<MiListaPersonajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiListaPersonajesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiListaPersonajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
