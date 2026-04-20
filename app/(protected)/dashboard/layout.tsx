import styles from './layout.module.css';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.dashboardNav}>
      {/* nav items */}
      {children}
    </div>
  );
}
