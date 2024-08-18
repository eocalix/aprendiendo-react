import { StrictMode, useState } from 'react';
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';
// style={{ display: 'flex', alignItems: 'center', color: '#fff' }}
export function App () {
    const formatF = (userName) => `@${userName}`;
    const formatE = <span>@eocalix</span>;

    const eocalix = { userName: 'eocalix', initialIsFollowing: true};

    const [name, setName] = useState('zevech91');
    return (
        <StrictMode>
            <section className='app'>
                <TwitterFollowCard 
                    formatFunction={formatF} 
                    formatElement={formatE}
                    { ...eocalix }
                >
                    Edwin Calix
                </TwitterFollowCard>
                { /* Comentarios */ }
                <TwitterFollowCard 
                    formatFunction={formatF} 
                    formatElement={formatE}
                    userName={name} 
                    isFollowing={false} 
                >
                    Edwin Chevez
                </TwitterFollowCard>

                <button onClick={() => setName('zevech1991')}>Cambiar usuario</button>
            </section>
        </StrictMode>
    )
}