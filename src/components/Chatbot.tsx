'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User } from 'lucide-react';
import { getDictionary } from "@/resources";

export function Chatbot() {
    const { chatbot: t } = getDictionary();

    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: '1', role: 'bot', content: t.greeting }
    ]);
    const [input, setInput] = useState('');
    const [isMobile, setIsMobile] = useState(false);
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = () => {
        if (typeof document !== 'undefined') {
            const activeElement = document.activeElement as HTMLElement;
            if (activeElement && typeof activeElement.blur === 'function') {
                activeElement.blur();
            }
        }
        setIsOpen(false);
    };
    const [isVisible, setIsVisible] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);


    // Drag-to-scroll for suggestions on desktop
    useEffect(() => {
        const el = suggestionsRef.current;
        if (!el) return;

        let isDown = false;
        let startX: number;
        let scrollLeft: number;

        const onMouseDown = (e: MouseEvent) => {
            isDown = true;
            isDragging.current = false;
            el.style.cursor = 'grabbing';
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
            
            document.body.style.userSelect = 'none';
            document.body.style.webkitUserSelect = 'none';
        };

        const onMouseMove = (e: MouseEvent) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const walk = (x - startX) * 2;
            if (Math.abs(walk) > 5) {
                isDragging.current = true;
            }
            el.scrollLeft = scrollLeft - walk;
        };

        const onMouseUp = () => {
            if (!isDown) return;
            isDown = false;
            el.style.cursor = '';
            
            document.body.style.userSelect = '';
            document.body.style.webkitUserSelect = '';
            
            setTimeout(() => {
                isDragging.current = false;
            }, 50);
        };

        el.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            el.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isOpen]);


    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('chatbotHidden');
            if (stored === 'true') {
                setIsVisible(false);
            }

            const handleToggle = (e: any) => {
                setIsVisible(e.detail.visible);
                if (e.detail.visible) {
                    localStorage.removeItem('chatbotHidden');
                } else {
                    localStorage.setItem('chatbotHidden', 'true');
                }
            };

            window.addEventListener('setChatbotVisibility', handleToggle);
            return () => window.removeEventListener('setChatbotVisibility', handleToggle);
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('chatbotStateChange', { detail: isOpen }));
        }
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e?: React.FormEvent, directMsg: string | null = null) => {
        e?.preventDefault();
        const messageText = directMsg || input;
        if (!messageText.trim() || isLoading) return;

        const userMessage = { id: Date.now().toString(), role: 'user', content: messageText };
        setMessages(prev => [...prev, userMessage]);
        if (!directMsg) setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.content })).concat({ role: 'user', content: messageText })
                })
            });

            const data = await response.json();

            if (response.status === 429) {
                throw new Error('RATE_LIMIT');
            }

            if (!response.ok) {
                throw new Error(data.error || 'API Error');
            }

            if (data.content) {
                setMessages(prev => [...prev, {
                    id: Date.now().toString(),
                    role: 'bot',
                    content: data.content
                }]);
            } else {
                throw new Error('No content in response');
            }
        } catch (error: any) {
            console.error('Chat Error:', error);
            let errorMessage = `${t.errorPrefix} ${error.message || 'An unknown error occurred.'}`;

            if (error.message === 'RATE_LIMIT') {
                errorMessage = t.rateLimit;
            }

            setMessages(prev => [...prev, {
                id: `error-${Date.now()}`,
                role: 'bot',
                content: errorMessage
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isVisible) return null;

    return (
        <div className="chatbot-container">
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div 
                            className="chatbot-overlay"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={handleClose}
                        />
                        <motion.div
                            className="chatbot-window"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <div className="chat-header">
                                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                    <Bot size={22} style={{ color: 'var(--brand-solid-strong)', strokeWidth: 'var(--icon-stroke-width, 1.5px)', fill: 'var(--icon-fill, none)' }} />
                                    {t.header}
                                </h3>
                                <button className="chat-header-close-btn" onClick={handleClose} style={{ background: 'none', border: 'none', color: 'var(--neutral-on-surface-medium)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="chat-messages" ref={messagesContainerRef}>
                                {messages.map((msg) => (
                                    <div key={msg.id} className={`message ${msg.role}`}>
                                        {msg.content}
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="message bot" style={{ opacity: 0.5 }}>
                                        {t.typing}
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            <div className="chat-suggestions" ref={suggestionsRef}>
                                {[
                                    t.suggestWho,
                                    t.suggestExp,
                                    t.suggestEdu,
                                    t.suggestProj,
                                    t.suggestContact,
                                    t.suggestTech
                                ].map((text, i) => (
                                    <button
                                        key={i}
                                        className="suggestion-btn"
                                        onClick={() => {
                                            if (isDragging.current) return;
                                            handleSend(undefined, text);
                                        }}
                                    >
                                        {text}
                                    </button>
                                ))}
                            </div>

                            <form className="chat-input-area" onSubmit={handleSend}>
                                <input
                                    type="text"
                                    className="chat-input"
                                    placeholder={t.placeholder}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    disabled={isLoading}
                                />
                                <button type="submit" className="send-btn" disabled={isLoading || !input.trim()}>
                                    <Send size={18} />
                                </button>
                            </form>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <motion.div
                className={`chatbot-bubble ${isOpen ? 'is-open' : ''}`}
                onClick={() => isOpen ? handleClose() : setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{ position: 'relative' }}
            >
                {isOpen ? <X size={28} /> : (
                    <>
                        <Bot size={28} />
                    </>
                )}
            </motion.div>
        </div>
    );
}
