import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthLayoutComponent } from './auth-layout.component';
import { RouterModule } from '@angular/router'; // Importa RouterModule

describe('AuthLayoutComponent', () => {
  let componente: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AuthLayoutComponent],
      imports: [
        RouterModule.forRoot([]), // Importa RouterModule y configura rutas vacías para el test
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthLayoutComponent);
    componente = fixture.componentInstance;
  });

  it('debería crear el componente', () => {
    expect(componente).toBeTruthy();
  });
});
