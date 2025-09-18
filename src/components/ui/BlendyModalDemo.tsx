import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { Blendy } from 'blendy'
import { createBlendy } from 'blendy'

export default function BlendyModalDemo() {
    const blendy = useRef<Blendy | null>(null)
    const [show, setShow] = useState(false)

    useEffect(() => {
        blendy.current = createBlendy({ animation: 'dynamic' })
    }, [])

    return (
        <div>
            {show && createPortal(
                <div className="modal" data-blendy-to="example">
                    <div>
                        <div className="modal__header">
                            <h2 className="modal__title">Blendy</h2>
                            <button className="modal__close" onClick={() => {
                                blendy.current?.untoggle('example', () => setShow(false))
                            }} />
                        </div>
                        <div className="modal__content">
                            <p>Transiciones suaves entre elementos con una API simple.</p>
                        </div>
                    </div>
                </div>, document.body)}

            <button className="button" data-blendy-from="example" onClick={() => {
                setShow(true)
                blendy.current?.toggle('example')
            }}>
                <span>Open</span>
            </button>
        </div>
    )
}
