import React from "react"
import { Link, graphql } from "gatsby"
import { Helmet } from "react-helmet"
import BuyButton from "../components/buy-button"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"

const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  const images = post.frontmatter.image
    .map(x => ({
      name: x.name,
      src: require(`./../../content/assets${post.frontmatter.path}${x.src}.jpg`)
    }));

  return (
    <Layout location={location} title={siteTitle}>
      <Helmet htmlAttributes={{ lang: 'en' }}>
        <title>${siteTitle}</title>
        <link href="https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css" rel="stylesheet" type="text/css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
        <script id="snipcart" src="https://cdn.snipcart.com/scripts/2.0/snipcart.js" data-api-key="MjUyOTA2MDEtNTVmMi00M2IzLTlkZmQtOTMwOWJmYzE4NjI1NjM3MzAwNDEyMTc5ODYwOTY0"></script>
      </Helmet>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
          <img src={post.frontmatter.image} alt={post.frontmatter.title}></img>

          <div dangerouslySetInnerHTML={{ __html: post.html }} />

          {/* <button
            className='snipcart-add-item buyBtn'
            data-item-id={post.frontmatter.id}
            data-item-price={post.frontmatter.price}
            data-item-image={post.frontmatter.image}
            data-item-name={post.frontmatter.title}
            data-item-description={post.frontmatter.description}
            data-item-url={"http://snipcart-gatsby.netlify.com" + post.frontmatter.path}>
            Buy
          </button> */}
          <BuyButton post={post.frontmatter} images={images}></BuyButton>

        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
      query BlogPostBySlug($slug: String!) {
        site {
          siteMetadata {
            title
            author
          }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
          id
          excerpt
          html
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            price
            id
            path
            description
            image {
              name
              src
            }
            customField {
              name
              values
            }
          }
        }
      }
    `