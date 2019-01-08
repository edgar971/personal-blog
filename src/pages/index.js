import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/layout'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  getPosts() {
    const posts = get(this, 'props.data.allMarkdownRemark.edges')

    if (process.env.NODE_ENV !== 'development') {
      return posts.filter(({ node }) => this.isPublished(node))
    }

    return posts
  }

  getTitle() {
    return get(this, 'props.data.site.siteMetadata.title')
  }

  getDescription() {
    return get(this, 'props.data.site.siteMetadata.description')
  }

  isPublished(node) {
    return get(node, 'frontmatter.published') === false ? false : true
  }

  buildTitle(node) {
    return get(node, 'frontmatter.title') || node.fields.slug
  }

  render() {
    const siteTitle = this.getTitle()
    const siteDescription = this.getDescription()
    const posts = this.getPosts()

    return (
      <Layout location={this.props.location}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: siteDescription }]}
          title={siteTitle}
        />
        <Bio />
        {posts.map(({ node }) => {
          const title = this.buildTitle(node)
          return (
            <div
              key={node.fields.slug}
              className={
                this.isPublished(node) ? 'post-published' : 'post-draft'
              }
            >
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: 'none' }} to={node.fields.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.frontmatter.date}</small>
              <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            published
            date(formatString: "DD MMMM, YYYY")
            title
          }
        }
      }
    }
  }
`
