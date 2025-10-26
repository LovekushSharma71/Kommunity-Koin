# Kommunity-Koin
A User-Choice Decentralized Loan System

## Overview
Kommunity-Koin is a decentralized lending platform that enables community-based lending decisions through democratic voting and syndicate participation. The platform combines traditional lending mechanisms with blockchain technology to ensure transparency and trust.

## Features
- Community Creation and Management
- Democratic Loan Approval Process
- Lending Syndicate Formation
- Smart Contract Integration
- Real-time Voting System
- Transparent Transaction History

## Tech Stack
- **Frontend**: React with TypeScript
- **Backend**: Django REST Framework
- **Database**: SQLite (Development) / PostgreSQL (Production)
- **Blockchain**: Ethereum (Solidity Smart Contracts)
- **UI Framework**: Chakra UI
- **State Management**: React Context + Hooks
- **Authentication**: JWT

## Project Structure
```
kommunity-koin/
├── backend/                 # Django backend
│   ├── kommunity_koin/     # Main Django project
│   └── loans/              # Django app for loan management
├── frontend/               # React frontend
│   └── src/
│       ├── components/     # React components
│       └── contexts/       # React context providers
└── contracts/             # Ethereum smart contracts
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- Python (v3.8+)
- pip
- Virtual environment tool (venv)
- Git

### Backend Setup
1. Create and activate virtual environment:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run migrations:
   ```bash
   python manage.py migrate
   ```

4. Start development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start development server:
   ```bash
   npm start
   ```

### Smart Contract Deployment
1. Install dependencies:
   ```bash
   cd contracts
   npm install
   ```

2. Deploy contract:
   ```bash
   npx hardhat run scripts/deploy.js --network <network-name>
   ```

## API Documentation
See [API Specification](./api-specification.md) for detailed API documentation.

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Testing
- Backend: `python manage.py test`
- Frontend: `npm test`
- Smart Contracts: `npx hardhat test`

## Security
- JWT-based authentication
- Smart contract security audits
- Input validation and sanitization
- Rate limiting on API endpoints
- CORS protection

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact
Project Link: [https://github.com/LovekushSharma71/Kommunity-Koin](https://github.com/LovekushSharma71/Kommunity-Koin)