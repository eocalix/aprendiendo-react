import { StrictMode, useState } from 'react';
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';
// style={{ display: 'flex', alignItems: 'center', color: '#fff' }}

const users = [
    {
        userName: 'eocalix',
        name: 'Edwin Chevez',
        isFollowing: true
    },
    {
        userName: 'zevech91',
        name: 'Orlando Chevez',
        isFollowing: false
    },
    {
        userName: 'echevez91',
        name: 'Edwin Orlando Chevez',
        isFollowing: true
    },
]

export function App () {    
    
    return (
        <StrictMode>
            <section className="app">
                {
                    // users.map(user => {
                    //     const { userName, name, isFollowing } = user
                    //     return (
                    //         <TwitterFollowCard userName={userName} initialIsFollowing={isFollowing} key={userName}>
                    //             {name}
                    //         </TwitterFollowCard>
                    //     )
                    // })
                    users.map(({ userName, name, isFollowing }) => (
                        <TwitterFollowCard key={userName} userName={userName} initialIsFollowing={isFollowing}>
                            {name}
                        </TwitterFollowCard>
                    ))
                }
            </section>
        </StrictMode>
    )
}