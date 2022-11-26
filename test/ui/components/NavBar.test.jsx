import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, useNavigate  } from 'react-router-dom';
import { AuthContext } from '../../../src/auth/context/AuthContext';
import { Navbar } from '../../../src/ui/components/NavBar';

const mockedUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUseNavigate
}))


describe ('Pruebas en <NavBar/>', () => {

    const contextValue = {
        logged: true,
        user: {
            name: 'sergio'
        },
        logout: jest.fn()
    }

    beforeEach(() => jest.clearAllMocks());

    test('Debe de mostrar el nombre del usuario al logearse', () => {
    
        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        expect( screen.getByText('sergio')).toBeTruthy();
    });
    

    test('Debe de llamar el logout y navigate cuando se hace click en el boton', () => {

        render(
            <AuthContext.Provider value={ contextValue }>
                <MemoryRouter>
                    <Navbar/>
                </MemoryRouter>
            </AuthContext.Provider>
        )

        const logoutBtn = screen.getByRole('button');
        fireEvent.click( logoutBtn );

        expect( contextValue.logout ).toHaveBeenCalled();
        expect( mockedUseNavigate ).toHaveBeenCalledWith("/login", {"replace": true});
    })
    

})