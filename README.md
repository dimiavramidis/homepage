In th following youtube video its explained within 2 minutes how to host a static website for free using github
https://www.youtube.com/watch?v=e5AwNU3Y2es&ab_channel=IdeaSpot

Here Some instructtions:

# Setting Up GitHub Pages with a Custom Domain

This guide will help you set up a GitHub Pages site and configure it to use a custom domain like `www.companyxyz.de`.

## Step 1: Create a GitHub Repository

1. Purchase your domain (e.g., companyxyz.de) from a domain registrar like GoDaddy, Namecheap, etc. (see how to in video)
2. Create a new repository on github.
3. Name the repository `<your-username>.github.io`.
4. Add a description (optional).
5. Make the repository public.
6. Do not initialize the repository with a README, .gitignore, or license.
7. Click "Create repository".

## Step 2: Upload Your Website Files

1. Create an `index.html` file on your local machine with the following content:

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My AI Services</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            header {
                background: #333;
                color: #fff;
                padding: 1rem 0;
                text-align: center;
            }
            .container {
                max-width: 800px;
                margin: 2rem auto;
                padding: 0 1rem;
            }
            footer {
                background: #333;
                color: #fff;
                text-align: center;
                padding: 1rem 0;
                position: fixed;
                width: 100%;
                bottom: 0;
            }
        </style>
    </head>
    <body>
        <header>
            <h1>Welcome to My AI Services</h1>
        </header>
        <div class="container">
            <p>Hello! I'm [Your Name], an AI enthusiast offering a variety of services in artificial intelligence.</p>
            <p>This is a draft homepage. More content and features will be added soon.</p>
        </div>
        <footer>
            <p>&copy; 2024 My AI Services</p>
        </footer>
    </body>
    </html>
    ```

2. Clone the repository to your local machine:
    ```sh
    git clone https://github.com/<your-username>/<your-username>.github.io.git
    ```

3. Copy the `index.html` file to the cloned repository folder.

4. Navigate to the repository folder in your terminal.

5. Add the file to the repository:
    ```sh
    git add index.html
    ```

6. Commit the file:
    ```sh
    git commit -m "Add draft homepage"
    ```

7. Push the changes to GitHub:
    ```sh
    git push origin main
    ```

## Step 3: Configure GitHub Pages

1. Go to your repository on GitHub.
2. Click on "Settings".
3. Scroll down to the "Pages" section.
4. Under "Custom domain", enter `www.companyxyz.de`.
5. Save the settings.

## Step 4: Configure DNS Settings

1. Log in to your domain registrar’s website.
2. Find the DNS settings or DNS management area.
3. Add the following `A` records:

    | Type | Name | Value             |
    |------|------|-------------------|
    | A    | @    | 185.199.108.153   |
    | A    | @    | 185.199.109.153   |
    | A    | @    | 185.199.110.153   |
    | A    | @    | 185.199.111.153   |

4. Add the following `CNAME` record:

    | Type  | Name | Value                         |
    |-------|------|-------------------------------|
    | CNAME | www  | `<your-username>.github.io`   |

## Step 5: Verify Your Setup

- Use [What's My DNS](https://www.whatsmydns.net/) to check the status of your DNS records.
- It may take some time for DNS changes to propagate.

## Step 6: Enable HTTPS

1. Go back to the "Pages" settings in your GitHub repository.
2. Check the "Enforce HTTPS" option if it is available.

After completing these steps, your GitHub Pages site should be accessible at `https://www.companyxyz.de`.

---

Feel free to modify this guide according to your specific needs.
