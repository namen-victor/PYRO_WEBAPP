type Props = { role?: 'admin' | 'staff' | 'client' | null };

export function RoleBadge({ role }: Props) {
  if (role === 'admin') return <span className="pill pill-admin" aria-label="User role: Admin">ADMIN</span>;
  if (role === 'staff') return <span className="pill pill-staff" aria-label="User role: Staff">STAFF</span>;
  return null;
}
