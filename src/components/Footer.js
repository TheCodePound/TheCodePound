import React from 'react'

export default function Footer() {

    return (
        <div className="footer">
            <h2 className="footer-text">Follow us on</h2>
            <div>
                <a href="http://facebook.com">
                    <img 
                        className="social-icon"
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Ffacebook.png?v=1548445188791"
                        alt="facebook"
                    />
                </a>
                <a href="http://twitter.com">
                    <img
                        className="social-icon"
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2FTwitter.png?v=1548445203937"
                        alt="twitter"
                    />
                </a>
                <a href="https://instagram.com">
                    <img
                        className="social-icon"
                        src="https://cdn.glitch.com/875fcc3a-ee91-4d48-806c-d5b121d9c21c%2Finstagram-png-instagram-png-logo-1455.png?v=1593050365479"
                        alt="instagram"
                    />
                </a>
            </div>
        </div>
    )
}