import { authReducer, types } from '../../../src/auth';


describe ('Pruebas en authReducer', () => {

    test('Debe de retornar el estado por defecto', () => {

        const state = authReducer({ logged: false }, {});
        expect( state ).toEqual({ logged: false });

    })


    test('(login) Debe de llamar el login y autenticar el usuario', () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Sergio',
                id: '123'
            }
        }

        const state = authReducer({ logged: false }, action );
        expect( state ).toEqual({
            logged: true,
            user: action.payload
        })

    })


    test('(logout) Debe de borrar el name del usuario y logged en false', () => {

        const state = {
            logged: true,
            user: { 
                id: '123',
                name: 'Sergio'
            }
        }

        const action = {
            type: types.logout
        }

        const newState = authReducer( state, action );
        expect( newState ).toEqual({ logged: false });
    })

})