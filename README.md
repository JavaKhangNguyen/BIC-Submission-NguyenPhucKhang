# Beincom Technical Test Submission - Nguyen Phuc Khang

## Disclaimer
The logo used in this application is for testing purposes only and is intended solely to represent the company. There is no intention to violate any copyrights, and all rights related to this logo are preserved.

## Overview
This submission is for the technical test given by Beincom, received on 14th October and completed by 19th October. The objective of the test was to develop a feature-rich web application using NextJS and ReactJS, integrating with the JSONPlaceholder API or any available mock API. The application was required to include authentication, a commenting system, search and filter functionality, pagination, responsive design, and testing. 

For ease of review, the application has been deployed at [https://npkhang-socials.vercel.app](https://npkhang-socials.vercel.app). While this version does not include full authentication due to limited resources, it simulates the core functionality required by the test and reflects how the development version would operate with authentication in place. If you'd like to explore the development code in more detail, please refer to the [Setup](#Setup) section.

## Tech stacks used
- **Programming languages:** Typescript, JavaScript
- **Frameworks:** NextJS, ReactJS, TailwindCSS
- **UI components libraries:** MaterialUI, FontAwesomeIcon
- **Requests handling:** axios
- **Testing:** vitest
- **State management:** zustand
- **Authentication:** Clerk
- **API:** DummyJSON

## Setup
1. Change the name of **.env.example** to **.env.local**. This is necessary for the environment variables referenced within the application to function correctly.

2. This application uses Clerk for authentication, which requires external setup. To enable Clerk, you need to create your own credentials by visiting the Clerk dashboard at [Clerk](https://dashboard.clerk.com) and following the instructions to set up your authentication system. If you prefer to save time, please feel free to contact the test candidate (contact information is provided at the end of this document) to obtain the API key. The test candidate has already set up authenticated users based on the DummyJSON API. Once you have the credential, please input it into the environment file (.env.local). The Clerk credential consist of two keys required for the authentication system: the publishable key and the API key.

If you are using the test candidate's authentication system, please log in with the default user account:
 - Email: jackson.evans<span>@</span>x.dummyjson.com
 - Password: jacksonepass

3. Install the necessary dependencies
```bash
npm install
```

4. Run the application on a development server
```bash
npm run dev
```

Access **http://localhost:3000** on your browser to view the application.

## Analysis

#### A/ Implementation
In accordance with the requirements, here are some potential advantages and disadvantages recognized through the analysis of this solution:

 1. Advantages:
   -  **Authentication**: Powered by Clerk, ensuring robust security measures are in place and that the authentication flow is easily managed to function as expected. Sign-in and sign-up included.
   -  **Commenting system**: The commenting functionality closely aligns with the requirements, allowing users to post comments and view them within the respective posts.
   -  **Search functionality**: Search is triggered by pressing the Enter key and allows users to find posts containing the specified keyword. The search implementation adheres closely to API best practices.
   -  **Filtering options**: The application provides three filtering options: sorting by most views, most likes, and most comments, all of which perform effectively.
   -  **Responsive design**: To evaluate the responsive design, the application was tested using two popular web performance measurement tools: PageSpeed Insights and Lighthouse: Pagespeed Insights and Lighthouse. The results shows as follows:

      - **Pagespeed Insights** ![Pagespeed Insights](https://github.com/JavaKhangNguyen/README-Assets/blob/434844e18f8ad04e9bba1254d1ee6c3ea0efc812/BIC%20Submissions/Implementation/Pagespeed%20Insights%20Performance.jpg)<br /><br />

      - **Lighthouse** ![Lighthouse](https://github.com/JavaKhangNguyen/README-Assets/blob/434844e18f8ad04e9bba1254d1ee6c3ea0efc812/BIC%20Submissions/Implementation/Lighthouse%20performance.jpg)

 
The application achieved an average score of approximately 66 for mobile and 83 for desktop, based on assessments from the two performance measurement tools. These results reflect the potential of the application's performance and demonstrate the effectiveness of the implementation of this application to achieve such a result.

   
 2. Disadvantages:
    - The application utilizes Clerk, a third-party authentication library, which requires external setup to align with the users available from the DummyJSON API. As a result, it does not fully demonstrate the complete flow of interacting with DummyJSON API for authentication.
    - Due to the nature of Clerk authentication, the comment simulation does not fully demonstrate that comments are posted by the currently logged-in user when using a different user account than the default one that was set up.


#### B/ Testing
To run tests for this application, execute:

```bash
npm test
```

This application use vitest for testing. Vitest has been setup in place, just execute the command directly. To test each file separately to see the tests, provide the filename after the test command. For example, 
*npm test CommentBox.test.jsx*. The tests file lies within the __tests__ directory

The testing include testing for these components: CommentBox, CommentCard, Navbar, Rightsidebar. Specific test cases and results are shown in images below:
![Tests](https://github.com/JavaKhangNguyen/README-Assets/blob/434844e18f8ad04e9bba1254d1ee6c3ea0efc812/BIC%20Submissions/Testing/Tests.jpg)

While the test cases cover the most critical components and functions with the highest impact, they might not account for all edge cases. I would greatly appreciate any suggestions for additional test cases I may have missed, as they would help me further expand my knowledge and improve the application's robustness.

## Conclusion
While this may not be the perfect solution, it serves as a solid foundation that meets most of the requirements outlined in the test and can easily be extended for future enhancements. I would like to express my sincere appreciation to Beincom for providing me with the opportunity to participate in this technical test. It allowed me to not only showcase my coding skills but also to further explore modern technologies in web application development.

This technical test also gave me valuable insight into Beincom’s company culture, how the team operates, and the nature of their main project, which is the [Beincom Social Community Platform](https://group.beincom.com). I was pleased to see that their tech stack — particularly the use of React.js for web applications and Next.js for backend development — closely aligns with my skills and my field of interest. With this alignment, I believe I could be a strong potential candidate for Beincom and contribute meaningfully to your projects.

I am excited about the prospect of advancing to the next round of interview and hope for the opportunity to further demonstrate how I can contribute my skills and knowledge.

Thank you once again for this opportunity. I look forward to hearing from you soon.

Best regards, 

Nguyen Phuc Khang

Email: khang2073@gmail.com

Phone: 0913324868
