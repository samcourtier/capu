locals {
  domains = [
    "capitolunited.org",
    "capitolunited.club",
    "capu.club",
  ]
}

resource "aws_route53_zone" "zone" {
  for_each = toset(local.domains)

  lifecycle {
    prevent_destroy = true
  }

  name = each.key
}

output "name_servers" {
  value = {
    for d in local.domains : d => aws_route53_zone.zone[d].name_servers
  }
  description = "The name servers in the 'Registered domains' section of the AWS Route 53 console need to match these."
}

resource "aws_route53_record" "a" {
  for_each = toset(local.domains)

  name    = ""
  type    = "A"
  ttl     = 300
  zone_id = aws_route53_zone.zone[each.key].zone_id

  records = [aws_eip.prod.public_ip]
}

resource "aws_route53_record" "www" {
  for_each = toset(local.domains)

  name    = "www"
  type    = "CNAME"
  ttl     = 300
  zone_id = aws_route53_zone.zone[each.key].zone_id

  records = [each.key]
}

resource "aws_route53_record" "stage" {
  for_each = var.include_stage ? toset(local.domains) : []

  name    = "stage"
  type    = "A"
  ttl     = 300
  zone_id = aws_route53_zone.zone[each.key].zone_id

  records = [aws_instance.stage[0].public_ip]
}