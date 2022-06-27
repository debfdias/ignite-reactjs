import styled from 'styled-components';

export const Container = styled.main`
    padding: 2.5rem 1rem;
    margin: 0 auto;
    max-width: 1120px;
`
export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 12rem;
    align-items:center;
    display: flex;
    justify-content:  space-between;

    button {
        font-size: 1rem;
        color: #fff;
        border: 0;
        padding: 0 2rem;
        background: var(--blue-light);
        border-radius: 0.25rem;
        height: 3rem;

        &:hover {
            filter: brightness(0.9)
        }
    }
`

