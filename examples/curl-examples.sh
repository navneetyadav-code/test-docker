# Run the server first: npm start

# Health check
curl -i http://localhost:3000/health

# Fetch all 20 fictional records
curl -s http://localhost:3000/api/people

# Fetch a smaller page
curl -s 'http://localhost:3000/api/people?limit=5'

# Filter by city
curl -s 'http://localhost:3000/api/people?city=Austin'

# Search by job title, company, name, email, or city
curl -s 'http://localhost:3000/api/people?search=engineer'

# Fetch one person
curl -s http://localhost:3000/api/people/1

# Confirm 404 behavior
curl -i http://localhost:3000/api/people/999
