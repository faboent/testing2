const Stepper = ({ warranty }: any) => {
  const calculateDaysLeft = () => {
    if (!warranty.warranty_expiry_date) return 0;

    const today = new Date();
    const expiryDate = new Date(warranty.warranty_expiry_date);
    const diffTime = expiryDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return Math.max(0, daysLeft);
  };

  const daysLeft = calculateDaysLeft();

  return (
    <div className="stepper">
      <div className="step">
        <div className="indicator red">0%</div>
        <div className="line red-orange" />
        <div className="description">{daysLeft} days left</div>
      </div>

      <div className="step">
        <div className="indicator orange">50%</div>
        <div className="line orange" />
        <div className="description">{daysLeft} days left</div>
      </div>

      <div className="step">
        <div className="indicator orange-dark">100%</div>
        <div className="description">{daysLeft} days left</div>
      </div>
    </div>
  );
};

export default Stepper;
