# Read-Only Mode Configuration

This document outlines how read-only mode is implemented in the application.

## Backend Implementation

The backend enforces read-only mode through middleware that intercepts and blocks write operations (POST, PUT, PATCH, DELETE).

### Key Files:
- `backend/src/middleware/readOnlyMiddleware.ts` - Middleware to block write operations
- `backend/src/index.ts` - Applies the read-only middleware to all routes

## Frontend Implementation

The frontend is aware of read-only mode through a React Context and adjusts the UI accordingly.

### Key Files:
- `frontend/src/context/ReadOnlyContext.tsx` - Provides read-only state to components
- `frontend/src/components/ReadOnlyBanner.tsx` - Displays a banner when in read-only mode
- `frontend/src/hooks/useReadOnlyField.ts` - Hook to manage form fields in read-only mode

### Using Read-Only Fields

Use the `useReadOnlyField` hook to create form fields that respect read-only mode:

```tsx
import { useReadOnlyField } from '../hooks/useReadOnlyField';

function MyForm() {
  const [formData, setFormData] = useState({ name: '' });
  
  const nameField = useReadOnlyField({
    value: formData.name,
    readOnlyValue: formData.name || 'Not provided',
    inputProps: {
      onChange: (e) => setFormData({...formData, name: e.target.value}),
      className: 'form-input',
      placeholder: 'Enter name'
    }
  });

  return (
    <form>
      <label>
        Name:
        <input {...nameField} />
      </label>
    </form>
  );
}
```

## Testing Read-Only Mode

1. Start the application in read-only mode (default)
2. Verify that:
   - The read-only banner is visible
   - Form inputs are disabled
   - API write operations return 403 Forbidden
   - The UI provides appropriate feedback for read-only state

## Disabling Read-Only Mode

To enable write operations:
1. Set `isReadOnly` to `false` in `ReadOnlyProvider`
2. Remove or modify the read-only middleware in the backend
