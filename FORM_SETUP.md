# Form Setup Documentation

## Netlify Form Configuration

The newsletter form is configured to work with Netlify's form handling system.

### How It Works

1. **Development Mode (localhost)**: 
   - Form submissions are simulated
   - Shows a development banner at the top
   - Logs form data to console
   - No actual submission to Netlify

2. **Production Mode (deployed to Netlify)**:
   - Form submissions are sent to Netlify
   - Data is collected in Netlify dashboard
   - Real form processing occurs

### Form Configuration

The form includes:
- `data-netlify="true"` - Enables Netlify form detection
- `netlify-honeypot="bot-field"` - Spam protection
- Hidden form name field for proper identification
- Honeypot field to prevent bot submissions

### Testing

- **Local Development**: Use `src/form-test.html` to test form functionality
- **Production**: Form will work automatically when deployed to Netlify

### Form Data

The form collects:
- Email address (required, validated)

### Success Handling

- Shows toast notification on successful submission
- Resets form after successful submission
- Handles errors gracefully with user feedback

### Development vs Production Detection

The system automatically detects the environment:
- `localhost`, `127.0.0.1`, or empty hostname = Development
- Any other hostname = Production

This ensures seamless development experience while maintaining full functionality in production. 