import { Header } from "./Header";

export function NotFound404({cart}) {
    <title>404 Not Found</title>
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Header cart={cart}/>
            <h1 style={{ fontSize: '6rem', margin: 0 }}>404</h1>
            <p style={{ fontSize: '1.5rem' }}>Page Not Found</p>
        </div>
    );
}