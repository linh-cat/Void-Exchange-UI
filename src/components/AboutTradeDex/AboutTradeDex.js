import React from 'react'
import { SelfGovernedMarket, TradeDexBG, VaultBG } from "@img/bg"

const AboutTradeDex = () => {
    return (
        <div className='relative flex flex-col gap-40 container mx-auto max-w-7xl px-20 2xl:px-0'>
            <div className="top text-center flex flex-col gap-3">
                <p className="text-slate-500 uppercase font-medium text-sm tracking-wider">Now Live</p>
                <h3 className="font-medium text-2xl">Start Trading</h3>
                <p className="text-sm">We are continuously launching new Perpetual Contract markets.</p>
            </div>
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="w-full xl:w-11/12 text-center lg:text-left">
                    <h1 className="text-5xl font-extrabold break-words leading-snug">Seamless trading experience with a slick UI</h1>
                    <p className="mt-5 text-slate-500 break-words leading-7">
                        We focus on UI/UX and aim to provide our users with the best trading experience. We worked on little details and will always be listening to user's feedbacks and keep iterating the UI/UX of the platform.
                    </p>
                </div>

                <div className="overflow-hidden border shadow rounded">
                    <img
                        src={TradeDexBG}
                        alt="trading img"
                        className="w-full h-full border rounded-md object-cover"
                    />
                </div>
            </section>

            <section className='flex items-center lg:flex-row flex-col-reverse gap-10'>
                <div className='overflow-hidden border shadow rounded w-full lg:w-11/12'>
                    <img src={VaultBG} alt='vault-bg' className='object-cover' />
                </div>
                <div className="text-center lg:text-left">
                    <h2 className='text-5xl font-extrabold break-words leading-snug'>Earn trading fees from Liquidity Vaults</h2>
                    <p className='mt-5 text-slate-500 break-words w-full lg:w-10/12 leading-7'>Maximize your earnings by depositing your liquidity tokens into our Liquidity Vaults. Risk is isolated for each vault. Start earning confidently.</p>
                </div>
            </section>
            <section className='grid grid-cols-1 lg:grid-cols-2 gap-5 items-center'>
                <div className='w-full lg:w-11/12 text-center lg:text-left'>
                    <h2 className='text-5xl font-extrabold break-words leading-tight'>Self-governed perpetual market</h2>
                    <p className='text-slate-500 break-words mt-5 leading-7'>Launch and profit from your own perpetual market with simple clicks. You can launch a perpetual market of any tokens, from crypto currencies to real-world assets and even meme coins.</p>
                </div>
                <div className='overflow-hidden border shadow rounded block'>
                    <img src={SelfGovernedMarket} alt='self-bg' className='object-cover w-full h-full' />
                </div>

            </section>
        </div>
    )
}

export default AboutTradeDex