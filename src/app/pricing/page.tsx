"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChange, logout, type User } from '@/lib/auth';

const PRICING_PLANS = [
  {
    id: 'basic',
    name: 'Basic Plan',
    price: 99,
    period: 'month',
    description: 'Perfect for getting started with your job search',
    features: [
      'Up to 10 job applications per month',
      'Basic resume review',
      'Email support',
      'Job search guidance',
      'Application tracking'
    ],
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    price: 199,
    period: 'month',
    description: 'Most popular for serious job seekers',
    features: [
      'Unlimited job applications',
      'Priority resume review',
      '1-on-1 career coaching',
      'Interview preparation',
      'LinkedIn optimization',
      'Priority support',
      'Advanced application tracking'
    ],
    popular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise Plan',
    price: 399,
    period: 'month',
    description: 'For professionals seeking executive positions',
    features: [
      'Everything in Premium',
      'Executive search support',
      'Personal career strategist',
      'Industry networking events',
      'Salary negotiation coaching',
      'Executive resume writing',
      'White-glove service'
    ],
    popular: false
  }
];

export default function PricingPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSelectPlan = (planId: string) => {
    if (!user) {
      router.push('/login');
      return;
    }
    
    if (user.role !== 'client') {
      alert('Only clients can subscribe to plans');
      return;
    }
    
    setSelectedPlan(planId);
    // In a real implementation, this would redirect to Stripe Checkout
    alert(`Redirecting to payment for ${planId} plan...`);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '50vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px 16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
        <div>
          <h1 style={{ margin: '0 0 8px 0', color: '#1C1C1E', fontSize: '32px' }}>
            Choose Your Plan
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '18px' }}>
            Get the support you need to land your dream job
          </p>
        </div>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
        gap: 24,
        marginBottom: 48
      }}>
        {PRICING_PLANS.map((plan) => (
          <div
            key={plan.id}
            style={{
              backgroundColor: '#fff',
              borderRadius: '12px',
              boxShadow: plan.popular ? '0 8px 32px rgba(0,123,255,0.15)' : '0 4px 16px rgba(0,0,0,0.1)',
              padding: '32px 24px',
              border: plan.popular ? '2px solid #007bff' : '1px solid #dee2e6',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            {plan.popular && (
              <div style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#007bff',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                fontWeight: 600
              }}>
                Most Popular
              </div>
            )}
            
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 8px 0', color: '#1C1C1E', fontSize: '24px' }}>
                {plan.name}
              </h3>
              <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '16px' }}>
                {plan.description}
              </p>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: '48px', fontWeight: 700, color: '#1C1C1E' }}>
                  ${plan.price}
                </span>
                <span style={{ fontSize: '18px', color: '#666', marginLeft: 4 }}>
                  /{plan.period}
                </span>
              </div>
            </div>

            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: '0 0 32px 0' 
            }}>
              {plan.features.map((feature, index) => (
                <li key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 12,
                  fontSize: '16px',
                  color: '#1C1C1E'
                }}>
                  <span style={{
                    color: '#28a745',
                    marginRight: 12,
                    fontSize: '18px'
                  }}>
                    ✓
                  </span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan(plan.id)}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: plan.popular ? '#007bff' : '#6c757d',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = plan.popular ? '#0056b3' : '#5a6268';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = plan.popular ? '#007bff' : '#6c757d';
              }}
            >
              {user ? 'Choose Plan' : 'Sign Up to Get Started'}
            </button>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: '#f8f9fa',
        padding: 32,
        borderRadius: '12px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 16px 0', color: '#1C1C1E' }}>
          Why Choose Pyro Solutions?
        </h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: 24,
          marginTop: 24
        }}>
          <div>
            <div style={{ fontSize: '32px', marginBottom: 8 }}>🎯</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>Targeted Approach</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              We focus on roles that match your skills and career goals
            </p>
          </div>
          <div>
            <div style={{ fontSize: '32px', marginBottom: 8 }}>📈</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>Proven Results</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              85% of our clients land interviews within 30 days
            </p>
          </div>
          <div>
            <div style={{ fontSize: '32px', marginBottom: 8 }}>🤝</div>
            <h4 style={{ margin: '0 0 8px 0', color: '#1C1C1E' }}>Personal Support</h4>
            <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
              Dedicated staff member assigned to guide your job search
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

