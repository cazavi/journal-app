import { loginWithEmailPassword, logoutFirebase, signInWithGoogle } from "../../../src/firebase/providers";
import { checkingCredentials, login, logout } from "../../../src/store/auth/authSlice";
import { checkingAuthentication, startGoogleSignIn, startLoginWithEmailPassword, startLogout } from "../../../src/store/auth/thunks";
import { clearNoteLogout } from "../../../src/store/journal/journalSlice";
import { demoUser } from "../../fixtures/authFixtures";

jest.mock('../../../src/firebase/providers');

describe('Pruebas en el auth thunks', () => {
  const dispatch = jest.fn();
  beforeEach(()=> jest.clearAllMocks());
  
  test('debe invocar el checkingCredentials ', async() => {
    await checkingAuthentication()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('startGoogleSignIn debe llamar a checkingCredentials y login - Éxito', async() => {
    const loginData = {ok: true, ...demoUser};
    await signInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe llamar a checkingCredentials y logout - Error', async() => {
    const logoutData = {ok: false, errorMessage:'Un error en Google'};
    await signInWithGoogle.mockResolvedValue(logoutData);
    await startGoogleSignIn()(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(logoutData.errorMessage));
  });

  test('startLoginWithEmailPassword debe llamar a checkingCredentials y login - Éxito', async() => {
    const loginData = {ok: true, ...demoUser};
    const formData = {email: demoUser.email, password: '123456'};
    await loginWithEmailPassword.mockResolvedValue(loginData);
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmailPassword debe llamar a checkingCredentials y logout - Error', async() => {
    const logoutData = {ok: false, errorMessage:'No se pudo iniciar sesión'};
    const formData = {email: demoUser.email, password: '123456'};
    await loginWithEmailPassword.mockResolvedValue(logoutData);
    await startLoginWithEmailPassword(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(logoutData.errorMessage));
  });

  test('startLogout debe llamar logoutFirebase, clearNotes y logout', async() => {
    await startLogout()(dispatch);
    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNoteLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});