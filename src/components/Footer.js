import React, { useState } from 'react';
import GradientButton from './common/buttons/GradientButton';
import AuthDebugger from './AuthDebugger';

const Footer = () => {
  const [showAuthDebugger, setShowAuthDebugger] = useState(false);
  const paren1 = '\u{2474}';
  const paren2 = '\u{2475}';
  return (
    <footer className="p-6">
      <p style={{ color: '#6792A0' }}>
        {paren1 + ' Serverless, token validation, and Mongo'}
      </p>
      <p style={{ color: '#6792A0' }}>
        {paren2 + ' Serverless, token validation, Redux, and Airtable'}
      </p>
      <br />

      <div className="ml-2">
        <GradientButton
          text="Auth Debugger"
          onClick={() => setShowAuthDebugger(!showAuthDebugger)}
        />
      </div>
      <div className="mt-4">{showAuthDebugger && <AuthDebugger />}</div>
    </footer>
  );
};

export default Footer;
