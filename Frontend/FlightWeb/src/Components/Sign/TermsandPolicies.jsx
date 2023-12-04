import React from "react";
import { Container, Typography, Paper } from "@mui/material";
import NavBar from "../Navbar/Navbar";

const TermsAndPolicies = () => {
  return (
    <>
      <NavBar />
      <Container component="main" maxWidth="md" style={{ marginTop: "100px" }}>
        <Paper style={{ padding: "20px", marginTop: "20px" }}>
          <Typography variant="h4" gutterBottom>
            Terms and Conditions
          </Typography>
          <Typography variant="body1">
            Welcome to Our Website. If you continue to browse and use this
            website, you are agreeing to comply with and be bound by the
            following terms and conditions of use, which together with our
            privacy policy govern FlightReservation relationship with you in
            relation to this website. The term FlightReservation or 'us' or 'we'
            refers to the owner of the website. The term 'you' refers to the
            user or viewer of our website. The use of this website is subject to
            the following terms of use: - The content of the pages of this
            website is for your general information and use only. It is subject
            to change without notice. - Neither we nor any third parties provide
            any warranty or guarantee as to the accuracy, timeliness,
            performance, completeness, or suitability of the information and
            materials found or offered on this website for any particular
            purpose. - Your use of any information or materials on this website
            is entirely at your own risk, for which we shall not be liable. -
            Unauthorized use of this website may give rise to a claim for
            damages and/or be a criminal offense. - From time to time, this
            website may also include links to other websites. These links are
            provided for your convenience to provide further information. They
            do not signify that we endorse the website(s). We have no
            responsibility for the content of the linked website(s).
          </Typography>

          <Typography variant="h4" gutterBottom style={{ marginTop: "20px" }}>
            Privacy Policy
          </Typography>
          <Typography variant="body1">
            {/* Add your privacy policy text here */}
            This Privacy Policy outlines how we collect, use, and protect your
            personal information when you use our website. 1. Information
            Collection: We collect information from you when you register on our
            site, place an order, subscribe to a newsletter, fill out a form, or
            enter information on our site. 2. Use of Information: Any of the
            information we collect from you may be used to personalize your
            experience, improve our website, improve customer service, process
            transactions, or send periodic emails. 3. Information Protection: We
            implement a variety of security measures to maintain the safety of
            your personal information. 4. Cookies: Our website may use "cookies"
            to enhance the user experience. 5. Disclosure of Information: We do
            not sell, trade, or otherwise transfer to outside parties your
            personally identifiable information. 6. Third-Party Links:
            Occasionally, at our discretion, we may include or offer third-party
            products or services on our website. 7. Consent: By using our site,
            you consent to our privacy policy. For any questions regarding this
            privacy policy, you may contact us.
          </Typography>
        </Paper>
      </Container>
    </>
  );
};

export default TermsAndPolicies;
